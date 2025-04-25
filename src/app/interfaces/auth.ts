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
    submitted?:boolean
}

export interface quizQuestions{
    question:string;
    options:string[];
    correctAnswer:string;
}

