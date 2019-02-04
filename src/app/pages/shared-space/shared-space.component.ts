import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PopupService } from 'src/provider/popup.service';
@Component({
  selector: 'app-shared-space',
  templateUrl: './shared-space.component.html',
  styleUrls: ['./shared-space.component.scss']
})
export class SharedSpaceComponent implements OnInit {
  mockDataJohnnieMaxTv = [];
  mockDataVote = [];
  mockDataAskJohhnieMax = [];
  questions = [];
  updateQuestionArray = [];
  deleteQuestionArray = [];
  playVideoShow = false;
  showJMaxTV = true;
  showVote = false;
  showAskJohnnieMax = false;
  showInputForQuestion = false;
  showInputForEdit = false;
  showAskedQuestions = true;
  showVotersForMyClass = false;
  videoUrl: string;
  askJohnnieMaxMyClassQuestionLength: number;
  askJohnnieMaxOtherClassQuestionLength: number;
  voteMyClassVotersLength: number;
  totalQuestionLength: number;
  sessionLength: number;
  mockDataVoteLength: number;
  userNameFromLocalStorage: string;
  pushQuestionArray = [];
  askedQuestion: string;
  setSessionQuestion: any;
  getSessionQuestion: any;
  bindSessionDataToInput: any;
  johnnieMaxTvMockData = 'assets/mockData/mockDataJohnnieMaxTv.json';
  johnnieMaxVoteMockData = 'assets/mockData/mockDataVotes.json';
  johnnieMaxAskMockData = 'assets/mockData/mockDataAskJohnnieMax.json';
  optionImage: string;
  bookName: string;
  loading = false;
  constructor(public popupService: PopupService,private http: Http) {
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];

  openPopup(type: string) {
    this.popupService.setPopupState(true);
    this.popupService.setPopupType(type);
  }
  playVideo(videoType, videoUrl) {
    this.playVideoShow = !this.playVideoShow;
    this.videoUrl = videoUrl;
    this.popupService.setVideoType(videoType);
    this.popupService.setVideoUrl(videoUrl);
    
  }
  openInputForQuestion() {
    this.showInputForQuestion = true;
  }
  closeInputForQuestion() {
    this.showInputForQuestion = false;
  }
  askQuestionMethod(question: any) {
    this.questions = JSON.parse(localStorage.getItem('questionsInfo')) || [];
    this.askedQuestion = question.value;
    this.questions.push(this.askedQuestion);
    localStorage.setItem('questionsInfo', JSON.stringify(this.questions));
    this.questions = JSON.parse(localStorage.getItem('questionsInfo'));
    this.sessionLength = this.questions.length + this.askJohnnieMaxMyClassQuestionLength;
    this.totalQuestionLength = this.sessionLength;
    this.showAskedQuestions = true;
    question.reset();
  }
  editQuestion(sessionData: any) {
    this.bindSessionDataToInput = sessionData;
    this.showInputForEdit = true;
  }
  updateQuestion(question, i) {
    this.updateQuestionArray = JSON.parse(localStorage.getItem('questionsInfo'));
    this.updateQuestionArray[i] = question.value;
    localStorage.setItem('questionsInfo', JSON.stringify(this.updateQuestionArray));
    this.questions = JSON.parse(localStorage.getItem('questionsInfo'));
    this.sessionLength = this.questions.length + this.askJohnnieMaxMyClassQuestionLength;
    this.totalQuestionLength = this.sessionLength;
  }
  deleteQuestion(sessionData, i) {
    this.deleteQuestionArray = JSON.parse(localStorage.getItem('questionsInfo'));
    this.deleteQuestionArray.splice(i, 1);
    localStorage.setItem('questionsInfo', JSON.stringify(this.deleteQuestionArray));
    this.questions = JSON.parse(localStorage.getItem('questionsInfo'));
    this.sessionLength = this.questions.length + this.askJohnnieMaxMyClassQuestionLength;
    this.totalQuestionLength = this.sessionLength;
  }
  // playVideo(videoUrl: string) {
  //   this.playVideoShow = !this.playVideoShow;
  //   this.videoUrl = videoUrl;
  //   setTimeout(() => {
  //     const myList = document.getElementsByTagName('mat-seek-progress-control');
  //     myList[0].classList.add('videoProgress');
  //     const getClass = document.getElementsByClassName('progress');
  //     getClass[0].classList.add('progressBackground');
  //   }, 4000);
  // }
  johnnieMaxTv() {
    this.showJMaxTV = true;
    this.showVote = false;
    this.showAskJohnnieMax = false;
    const getClass = document.getElementsByClassName('btn-primary');
    for (let i = 0; i <= 2; i++) {
      getClass[0].classList.add('firstBtn');
      getClass[1].classList.remove('secondBtn');
      getClass[2].classList.remove('thirdBtn');
    }
    this.http.get(this.johnnieMaxTvMockData).subscribe(
      mockData => {
        this.mockDataJohnnieMaxTv = mockData.json();
      },
      err => console.log(err),
      () => console.log());
  }
  johnnieMaxVote() {
    this.showVote = true;
    this.showJMaxTV = false;
    this.playVideoShow = false;
    this.showAskJohnnieMax = false;
    this.loading = true;
    const getClass = document.getElementsByClassName('btn-primary');
    for (let i = 0; i <= 2; i++) {
      getClass[0].classList.remove('firstBtn');
      getClass[1].classList.add('secondBtn');
      getClass[2].classList.remove('thirdBtn');
    }
    this.http.get(this.johnnieMaxVoteMockData).subscribe(
      mockData => {
        this.mockDataVote = mockData.json();
        console.log(this.mockDataVote);        
        this.loading = false;
      }
    );
  }
  askJohnnieMax() {
    this.showAskJohnnieMax = true;
    this.showVote = false;
    this.showJMaxTV = false;
    this.playVideoShow = false;
    const getClass = document.getElementsByClassName('btn-primary');
    for (let i = 0; i <= 2; i++) {
      getClass[0].classList.remove('firstBtn');
      getClass[1].classList.remove('secondBtn');
      getClass[2].classList.add('thirdBtn');
    }
    this.http.get(this.johnnieMaxAskMockData).subscribe(
      mockData => {
        this.mockDataAskJohhnieMax = mockData.json();
        this.askJohnnieMaxMyClassQuestionLength = this.mockDataAskJohhnieMax['askJohnnieMaxQuestion'][0]['myClass'][0]['questions'].length;
        this.sessionLength = this.questions.length + this.askJohnnieMaxMyClassQuestionLength;
        this.totalQuestionLength = this.sessionLength;
        this.askJohnnieMaxOtherClassQuestionLength =
        this.mockDataAskJohhnieMax['askJohnnieMaxQuestion'][0]['otherClass'][0]['questions'].length;
        this.questions = JSON.parse(localStorage.getItem('questionsInfo'));

        this.userNameFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
        if (localStorage.getItem('questionsInfo') === null) {
          this.showAskedQuestions = false;
        } else {
          this.sessionLength = this.questions.length + this.askJohnnieMaxMyClassQuestionLength;
          this.totalQuestionLength = this.sessionLength;
        }
      }
    );
  }
  votesNames(mockVotes) {
    console.log(mockVotes);
    this.showVotersForMyClass = true;
  }
  ngOnInit() {
    this.johnnieMaxTv();
  }
}
