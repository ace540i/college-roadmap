import React, { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  from: 'user' | 'bot';
  text: string;
};

const cannedReplies = [
  'I can help with study plans, college timelines, and application tips. What would you like to know?',
  'Start with strong grades, extracurriculars that match your interests, and at least one test prep plan for SAT/ACT.',
  'For essays: draft early, get two rounds of feedback, and tailor each essay to the school/program.'
];

function generateReply(userText: string) {
  const t = userText.toLowerCase();
  if (t.includes('sat') || t.includes('act') || t.includes('test')) {
    return 'For standardized tests, start with a diagnostic test, then follow a weekly practice schedule. Consider official practice tests and short timed sections.';
  }
  if (t.includes('essay') || t.includes('personal') || t.includes('statement')) {
    return 'Work on a clear story: show impact, be concise, and get feedback from a teacher or mentor on tone and clarity.';
  }
  if (t.includes('scholar') || t.includes('financial') || t.includes('fafsa')) {
    return 'Look for scholarships early and keep an organized list of deadlines. For FAFSA, have parent tax info ready and file early.';
  }
  // fallback: rotate canned replies
  return cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: 'bot', text: 'Hi! I\'m HiScholar Bot — ask me anything about college prep.' }
  ]);
  const [input, setInput] = useState('');
  const nextId = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function toggleOpen() {
    setOpen(o => !o);
  }

  function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const id = nextId.current++;
    setMessages(m => [...m, { id, from: 'user', text }]);
    setInput('');

    // simulate bot response
    setTimeout(() => {
      const id2 = nextId.current++;
      const reply = generateReply(text);
      setMessages(m => [...m, { id: id2, from: 'bot', text: reply }]);
    }, 600);
  }

  function clearChat() {
    setMessages([{ id: nextId.current++, from: 'bot', text: "Let's start a new conversation — how can I help?" }]);
  }

  return (
    <div className="chatbot-root">
      <button
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="chatbot-button"
        onClick={toggleOpen}
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chatbot">
          <div className="chatbot-header">
            <strong>HiScholar Bot</strong>
            <div className="chatbot-header-actions">
              <button onClick={clearChat} className="chatbot-clear">New</button>
              <button onClick={toggleOpen} className="chatbot-close">✕</button>
            </div>
          </div>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map(m => (
              <div key={m.id} className={`chatbot-message ${m.from === 'user' ? 'user' : 'bot'}`}>
                <div className="chatbot-message-text">{m.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={sendMessage}>
            <input
              className="chatbot-input"
              placeholder="Type a question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="Type a message"
            />
            <button type="submit" className="chatbot-send">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
