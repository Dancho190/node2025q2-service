import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private logLevel: number;
  private logFile: string;
  private maxFileSize: number = 20 * 1024; // 20KB
  private levels = { error: 0, warn: 1, info: 2, debug: 3 };

  constructor() {
    const level = process.env.LOG_LEVEL as keyof typeof this.levels;
    this.logLevel = this.levels[level] ?? this.levels.info;
    this.logFile = path.join(process.cwd(), 'logs', 'app.log');
    this.ensureLogDir();
  }

  private ensureLogDir() {
    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  // пишет лог в консоль и файл
  private write(level: string, message: string, context?: string) {
    if (this.levels[level] > this.logLevel) return;

    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] [${level.toUpperCase()}] ${context ? `[${context}] ` : ''}${message}\n`;

    console.log(log.trim());
    this.writeToFile(log);
  }

  // Запись в файл + проверка размера
  private writeToFile(log: string) {
    try {
      if (fs.existsSync(this.logFile)) {
        const stats = fs.statSync(this.logFile);
        if (stats.size > this.maxFileSize) this.rotateLog();
      }
      fs.appendFileSync(this.logFile, log);
    } catch (err) {
      console.error('Failed to write log:', err);
    }
  }

  private rotateLog() {
    const timestamp = Date.now();
    const newFile = this.logFile.replace('.log', `-${timestamp}.log`);
    fs.renameSync(this.logFile, newFile);
  }

  // Публичные методы для использования в других классах
  log(message: string, context?: string) {
    this.write('info', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.write('error', `${message}${trace ? `\n${trace}` : ''}`, context);
  }

  warn(message: string, context?: string) {
    this.write('warn', message, context);
  }

  debug(message: string, context?: string) {
    this.write('debug', message, context);
  }
}