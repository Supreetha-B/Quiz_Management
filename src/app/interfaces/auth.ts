export interface registerPostData {
    firstName:string;
    mail:string;
    pwd:string;

}
export interface Users extends registerPostData{
    id:string
}

export interface quizData{
    id?:string;
    title:string;
    startDate:string;
    endDate:string;
    questions:quizQuestions[];
    answers?:string[];
    attendedTime?:string;
    submitted?:boolean;
    selectedAnswers?:{[questionIndex:number]:string}
}

export interface quizQuestions{
    question:string;
    options:string[];
    correctAnswer:string;
}

export interface userQuizStatus{
    id?:string;
    quizId:string;
    userId:string;
    submitted:boolean;
    selectedAnswers?:{[questionIndex:number]:string};
    attendedTime?:string;
}

export interface userQuizResults{
    id?:string;
    quizId:string;
    userId:string;
    correctAnswers:string;
    totalQuestions:string;


}

