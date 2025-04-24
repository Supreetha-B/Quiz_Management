export interface registerPostData {
    firstName:string;
    mail:string;
    pwd:string;

}
export interface Users extends registerPostData{
    id:string
}

export interface quizData{
    title:string;
    startDate:string;
    endDate:string;
    questions:quizQuestions[];
}

export interface quizQuestions{
    question:string;
    options:[];
    correctAnswer:string;
}