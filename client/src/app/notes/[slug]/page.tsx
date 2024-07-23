"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavBar from "@/app/components/NavBar";

interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

interface QuizData {
  questions: QuizQuestion[];
}

export default function QuizPage({}: { params: { slug: string } }) {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const storedQuizData = localStorage.getItem("quizData");
    if (storedQuizData) {
      try {
        let parsedData;
        // Check if the data is already an object or if it needs to be parsed
        if (typeof storedQuizData === "object") {
          parsedData = storedQuizData;
        } else {
          parsedData = JSON.parse(storedQuizData);
        }

        // If parsedData is still a string (due to double stringification), parse it again
        if (typeof parsedData === "string") {
          parsedData = JSON.parse(parsedData);
        }

        if (
          parsedData &&
          Array.isArray(parsedData.questions) &&
          parsedData.questions.length > 0
        ) {
          setQuizData(parsedData);
        } else {
          console.error("Invalid quiz data structure");
        }
      } catch (error) {
        console.error("Error parsing quiz data:", error);
      }
    }
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !quizData || !quizData.questions) return;

    setIsAnswerSubmitted(true);
    if (selectedAnswer === quizData.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!quizData || !quizData.questions) return;

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-yellow-500">
        <div className="text-white text-2xl">
          No quiz data available. Please go back and generate a quiz.
        </div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="flex min-h-[100dvh] px-12 flex-col custom-bg">
      <NavBar />

      <main className="flex-1 px-6 py-6 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="rounded-lg bg-[#F5F5F5] p-4 shadow-lg">
            {!quizCompleted ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Question {currentQuestionIndex + 1} of{" "}
                  {quizData.questions.length}
                </h2>
                <p className="text-lg text-black mb-4">
                  {currentQuestion.question}
                </p>
                <div className="space-y-2">
                  {currentQuestion.choices.map((choice, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(choice)}
                      className={`w-full text-left justify-start ${
                        selectedAnswer === choice
                          ? isAnswerSubmitted
                            ? selectedAnswer === currentQuestion.answer
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      } text-black`}
                      disabled={isAnswerSubmitted}
                    >
                      {choice}
                    </Button>
                  ))}
                </div>
                {isAnswerSubmitted && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      {selectedAnswer === currentQuestion.answer
                        ? "Correct!"
                        : "Incorrect. The correct answer is: " +
                          currentQuestion.answer}
                    </p>
                    <p className="mt-2">{currentQuestion.explanation}</p>
                  </div>
                )}
                <div className="mt-4">
                  {!isAnswerSubmitted ? (
                    <Button
                      onClick={handleSubmitAnswer}
                      className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black"
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-black text-white "
                    >
                      {currentQuestionIndex < quizData.questions.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Quiz Completed!
                </h2>
                <p className="text-lg text-black mb-4">
                  Your score: {score} out of {quizData.questions.length}
                </p>
                <Link href="/notes">
                  <Button className="bg-black text-white">Back to Notes</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
