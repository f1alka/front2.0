import React, { useEffect, useState } from 'react';

const IntroScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`intro-screen ${visible ? '' : 'intro-hidden'}`}>
      <h1>HP FUTURA</h1>
      <h2>Work project</h2>
      <p>Автоматическая система разгрузки персонала</p>
    </div>
  );
};

export default IntroScreen;