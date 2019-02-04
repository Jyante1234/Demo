import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  @Output() popupState: EventEmitter<boolean> = new EventEmitter();
  @Output() popupType: EventEmitter<string> = new EventEmitter();
  @Output() pdfUrl: EventEmitter<string> = new EventEmitter();
  @Output() assignBookType: EventEmitter<string> = new EventEmitter();
  @Output() popupName: EventEmitter<string> = new EventEmitter();
  @Output() popupDescription: EventEmitter<string> = new EventEmitter();
  @Output() reportType: EventEmitter<string> = new EventEmitter();
  @Output() alertType: EventEmitter<string> = new EventEmitter();
  @Output() gameType: EventEmitter<string> = new EventEmitter();
  @Output() popupGameUrl: EventEmitter<string> = new EventEmitter();
  @Output() videoType: EventEmitter<string> = new EventEmitter();
  @Output() popupVideoUrl: EventEmitter<string> = new EventEmitter();
  constructor() { }
  setPopupState(value: boolean) {
    this.popupState.emit(value);
  }
  setPopupType(value: string) {
    this.popupType.emit(value);
  }
  setPdfUrl(value: any) {
    this.pdfUrl.emit(value);
  }
  setAssignBookType(value: string) {
    setTimeout(() => {
      this.assignBookType.emit(value);
    }, 1);
  }
  setReportType(value: string) {
    setTimeout(() => {
      this.reportType.emit(value);
    }, 1);
  }
  setAlertType(value: string) {
    setTimeout(() => {
      this.alertType.emit(value);
    }, 1);
  }
  setGameType(value: string) {
    setTimeout(() => {
      this.gameType.emit(value);
    }, 1);
  }
  setVideoType(value: string) {
    setTimeout(() => {
      this.videoType.emit(value);
    }, 1);
  }
  setPopupDescription(desc: string) {
    this.popupDescription.emit(desc);
  }
  setGameUrl(desc: string) {
    this.popupGameUrl.emit(desc);
  }
  setVideoUrl(desc: string) {
    this.popupVideoUrl.emit(desc);
  }

}
