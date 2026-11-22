import { useEffect, useState } from 'react';

const key = 'rdbms-study-progress';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || {
        completedTopics: {},
        bookmarks: {},
        notes: {},
        quizHistory: [],
        lastVisited: null,
        streak: 1
      };
    } catch {
      return { completedTopics: {}, bookmarks: {}, notes: {}, quizHistory: [], lastVisited: null, streak: 1 };
    }
  });

  useEffect(() => localStorage.setItem(key, JSON.stringify(progress)), [progress]);

  const update = (patch) => setProgress((old) => ({ ...old, ...patch }));
  const toggleCompleted = (topicId) =>
    setProgress((old) => {
      const completedTopics = { ...old.completedTopics };
      if (completedTopics[topicId]) delete completedTopics[topicId];
      else completedTopics[topicId] = true;
      return { ...old, completedTopics };
    });
  const toggleBookmark = (topicId) =>
    setProgress((old) => ({
      ...old,
      bookmarks: { ...old.bookmarks, [topicId]: !old.bookmarks[topicId] }
    }));

  return { progress, update, toggleCompleted, toggleBookmark };
}
