import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import type { AcademyModule } from "../../pages/academy/EngineerAcademyData";

interface ModuleViewerProps {
  module: AcademyModule;
  onClose: () => void;
  onComplete: () => void;
}

export function ModuleViewer({ module, onClose, onComplete }: ModuleViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const totalSteps = module.content.length + 1; // +1 for the quiz
  const isQuiz = currentStep === module.content.length;
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
  };

  const finishModule = () => {
    if (selectedAnswer === module.quiz[0].correctAnswerIndex) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-background/95 border border-border rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-surface/50">
          <div>
            <span className="text-growbroo-500 font-mono text-xs tracking-wider uppercase mb-1 block">Module Viewer</span>
            <h2 className="text-2xl font-bold">{module.title}</h2>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white rounded-full w-10 h-10 p-0">✕</Button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-surface w-full">
          <motion.div 
            className="h-full bg-growbroo-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!isQuiz ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h3 className="text-3xl font-bold mb-8 text-white">{module.content[currentStep].heading}</h3>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  {module.content[currentStep].body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                
                {module.content[currentStep].checklist && (
                  <div className="mt-10 p-6 bg-surface/30 rounded-xl border border-border">
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm text-growbroo-500">Key Takeaways Checklist</h4>
                    <ul className="space-y-3">
                      {module.content[currentStep].checklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <svg className="w-5 h-5 text-growbroo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <span className="text-growbroo-500 font-mono text-xs tracking-wider uppercase mb-2 block">Knowledge Check</span>
                <h3 className="text-2xl font-bold mb-8 text-white">{module.quiz[0].question}</h3>
                
                <div className="space-y-3 mb-8">
                  {module.quiz[0].options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={showExplanation}
                      onClick={() => setSelectedAnswer(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        showExplanation
                          ? i === module.quiz[0].correctAnswerIndex
                            ? 'bg-green-500/10 border-green-500/50 text-green-400'
                            : i === selectedAnswer
                              ? 'bg-red-500/10 border-red-500/50 text-red-400'
                              : 'bg-surface/30 border-border text-gray-500 opacity-50'
                          : selectedAnswer === i
                            ? 'bg-growbroo-500/10 border-growbroo-500 text-white'
                            : 'bg-surface/30 border-border text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`p-5 rounded-xl border ${selectedAnswer === module.quiz[0].correctAnswerIndex ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
                    >
                      <h4 className={`font-bold mb-2 ${selectedAnswer === module.quiz[0].correctAnswerIndex ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedAnswer === module.quiz[0].correctAnswerIndex ? 'Correct! 🎉' : 'Incorrect'}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{module.quiz[0].explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="px-8 py-5 border-t border-border flex justify-between items-center bg-surface/50">
          <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className="text-gray-400 hover:text-white">
            ← Previous
          </Button>
          
          <div className="flex gap-4">
            {!isQuiz ? (
              <Button onClick={handleNext} variant="premium" className="px-8">Continue</Button>
            ) : !showExplanation ? (
              <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null} variant="premium" className="px-8">Submit Answer</Button>
            ) : selectedAnswer === module.quiz[0].correctAnswerIndex ? (
              <Button onClick={finishModule} className="bg-growbroo-500 text-black hover:bg-growbroo-600 font-bold px-8">Complete Module</Button>
            ) : (
              <Button onClick={() => { setShowExplanation(false); setSelectedAnswer(null); }} variant="outline" className="px-8 border-red-500/50 text-red-400">Try Again</Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
