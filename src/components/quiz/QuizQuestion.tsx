import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizOption } from "@/data/quizzes";

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  onAnswer: (resultId: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export const QuizQuestion = ({
  question,
  options,
  onAnswer,
  currentQuestion,
  totalQuestions,
}: QuizQuestionProps) => {
  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-white/80">
            Soru {currentQuestion} / {totalQuestions}
          </span>
          <span className="text-xs sm:text-sm font-medium text-white">
            %{Math.round((currentQuestion / totalQuestions) * 100)}
          </span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-secondary to-secondary/80 transition-all duration-500 ease-out"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-white px-2">{question}</h2>

      <div className="grid gap-3 sm:gap-4">
        {options.map((option, index) => (
          <Card
            key={option.id}
            className="p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 border border-white/20 bg-white/95 backdrop-blur-sm hover:bg-white group active:scale-95"
            onClick={() => onAnswer(option.resultId)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center font-semibold text-base sm:text-lg text-white group-hover:bg-secondary transition-colors">
                {String.fromCharCode(65 + index)}
              </div>
              <p className="text-sm sm:text-base md:text-lg font-medium text-primary group-hover:text-secondary transition-colors">
                {option.text}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
