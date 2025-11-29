import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { quizzes } from "@/data/quizzes";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [suggestion, setSuggestion] = useState("");

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

const handleSuggestion = async () => {
    if (suggestion.trim()) {
      try {
        const { error } = await supabase
          .from('test_onerileri')
          .insert([{ film_dizi: suggestion.trim() }])
        
        if (error) throw error
        
        toast.success("Öneriniz kaydedildi! Teşekkürler 🎉");
        setSuggestion("");
      } catch (error) {
        console.error('Hata:', error)
        toast.error("Bir hata oluştu, lütfen tekrar deneyin");
      }
    } else {
      toast.error("Lütfen bir öneri yazın");
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 sticky top-0 bg-white/10 backdrop-blur-lg z-10 shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-5">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <img
                src="/Pink and Yellow Retro Playful Club Logo (1).png"
                alt="Dizi Ruhun Logo"
                className="h-10 sm:h-12 md:h-16 w-auto object-contain"
              />
            </h1>
            <div className="text-xs sm:text-sm text-white/80 bg-white/10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm whitespace-nowrap">
              {quizzes.length} Test
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <section className="mb-8 sm:mb-12 text-center animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-white px-2">
            En Sevdiğin Diziden Hangi Karaktersin?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Kişilik testlerimizle hangi karaktere benzediğini keşfet! 🎬✨
          </p>

          <div className="max-w-xl mx-auto relative px-2">
            <Search className="absolute left-5 sm:left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Test ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-12 py-4 sm:py-6 text-base sm:text-lg bg-white/90 backdrop-blur-sm border-white/20 focus:border-secondary focus:ring-secondary text-primary placeholder:text-primary/60"
            />
          </div>
        </section>

        <section className="mb-10 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
            {filteredQuizzes.map((quiz, index) => (
              <div 
                key={quiz.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in"
              >
                <QuizCard
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  icon={quiz.icon}
                  emoji={quiz.emoji}
                />
              </div>
            ))}
          </div>
          {filteredQuizzes.length === 0 && (
            <div className="text-center py-8 sm:py-12 px-4">
              <p className="text-lg sm:text-xl text-white/80">
                Aradığınız kriterlere uygun test bulunamadı.
              </p>
            </div>
          )}
        </section>

        <section className="max-w-2xl mx-auto animate-fade-in px-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-center text-white">Test Önerisi Gönder</h3>
            <p className="text-sm sm:text-base text-white/80 text-center mb-4 sm:mb-6">
              Hangi dizi veya film için test görmek istersin? Önerini bizimle paylaş!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Örn: Prison Break, La Casa de Papel..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSuggestion()}
                className="text-sm sm:text-base bg-white/90 backdrop-blur-sm border-white/20 text-primary placeholder:text-primary/60 w-full"
              />
              <Button onClick={handleSuggestion} size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none w-full sm:w-auto shrink-0">
                <Send className="w-4 h-4 mr-2" />
                <span className="whitespace-nowrap">Gönder</span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 mt-10 sm:mt-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 sm:py-6 text-center text-white/70">
          <p className="text-sm sm:text-base">© 2025 <span className="font-semibold text-white">Dizi Ruhun</span>. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
