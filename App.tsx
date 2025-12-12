import React, { useState, useEffect } from 'react';
import { LESSONS } from './data/lessons';
import { Language, Lesson, TestFramework } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { InfoPanel } from './components/layout/InfoPanel';
import { EditorPanel } from './components/layout/EditorPanel';
import { RoleReferenceModal } from './components/RoleReferenceModal';
import { Cheatsheet } from './components/Cheatsheet';

const STORAGE_KEYS = {
  COMPLETED: 'testmaster_completed_lessons',
  ACTIVE: 'testmaster_active_lesson',
  CODE: 'testmaster_user_code',
  LANG: 'testmaster_lang'
};

// Dummy lesson object for the Intro/Cheatsheet view to prevent crashes
const INTRO_LESSON_STUB: Lesson = {
  id: 'INTRO',
  section: 'General',
  title: { en: 'Cheatsheet', zh: '速查表' },
  description: { en: '', zh: '' },
  framework: TestFramework.RTL,
  difficulty: 'Beginner',
  requirements: [],
  initialCode: '',
  targetComponent: () => null,
  targetCodeDisplay: '',
  validationRules: [],
  hint: { en: '', zh: '' }
};

const App: React.FC = () => {
  // 1. Initialize state from LocalStorage
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    // Default to 'INTRO' if first time, or fetch from storage
    return localStorage.getItem(STORAGE_KEYS.ACTIVE) || 'INTRO';
  });

  const [userCode, setUserCode] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CODE);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn("Failed to parse saved code", e);
      return {};
    }
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to parse completed lessons", e);
      return [];
    }
  });

  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'en';
  });

  const [showHint, setShowHint] = useState(false);
  const [showA11y, setShowA11y] = useState(false);

  // Derive active lesson safely
  const activeLesson = activeLessonId === 'INTRO' 
    ? INTRO_LESSON_STUB 
    : (LESSONS.find(l => l.id === activeLessonId) || LESSONS[0]);

  // 2. Persist state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE, activeLessonId);
  }, [activeLessonId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CODE, JSON.stringify(userCode));
  }, [userCode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  }, [lang]);

  // 3. Ensure code exists for current lesson (Initial load fallback)
  useEffect(() => {
    if (activeLessonId !== 'INTRO' && !userCode[activeLessonId]) {
      setUserCode(prev => ({
        ...prev,
        [activeLessonId]: activeLesson.initialCode
      }));
    }
    setShowHint(false); // Reset hint on lesson change
  }, [activeLessonId, activeLesson.initialCode]);

  const handleCodeChange = (val: string) => {
    setUserCode(prev => ({ ...prev, [activeLessonId]: val }));
  };

  const handleTestPass = (passed: boolean) => {
    if (passed && !completedLessons.includes(activeLessonId)) {
      setCompletedLessons(prev => [...prev, activeLessonId]);
    }
  };

  return (
    <div className="flex h-screen bg-dark-950 text-slate-200 overflow-hidden font-sans">
      
      {showA11y && (
        <RoleReferenceModal 
          onClose={() => setShowA11y(false)} 
          lang={lang} 
        />
      )}

      <Sidebar 
        lessons={LESSONS} 
        activeLessonId={activeLessonId} 
        completedLessons={completedLessons} 
        onSelectLesson={setActiveLessonId} 
        lang={lang} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen relative">
        
        {/* Only show standard Header/Editor layout if NOT in INTRO mode */}
        {activeLessonId === 'INTRO' ? (
          <div className="flex-1 h-full">
            <Cheatsheet lang={lang} />
          </div>
        ) : (
          <>
            <Header 
              lesson={activeLesson}
              showHint={showHint}
              onToggleHint={() => setShowHint(!showHint)}
              lang={lang}
              onToggleLang={() => setLang(l => l === 'en' ? 'zh' : 'en')}
              onToggleA11y={() => setShowA11y(true)}
            />

            {/* Workspace */}
            <div className="flex-1 flex overflow-hidden">
              <InfoPanel 
                lesson={activeLesson}
                lang={lang}
                showHint={showHint}
              />

              <EditorPanel 
                lesson={activeLesson}
                code={userCode[activeLessonId] || ''}
                onCodeChange={handleCodeChange}
                onTestPass={handleTestPass}
                lang={lang}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;