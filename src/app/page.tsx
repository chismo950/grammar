import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      maxWidth: '650px', 
      margin: '50px auto', 
      padding: '40px', 
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ color: '#37517e', marginBottom: '30px' }}>
        English Grammar Quizzes
      </h1>
      
      <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1em' }}>
        Choose a quiz to test your English grammar skills
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Link 
          href="/quizzes/1" 
          style={{ 
            padding: '15px 25px', 
            backgroundColor: '#4066c7', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '10px',
            fontSize: '1.1em',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
        >
          Quiz 1 - Basic Grammar
        </Link>
        
        <Link 
          href="/quizzes/2" 
          style={{ 
            padding: '15px 25px', 
            backgroundColor: '#4066c7', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '10px',
            fontSize: '1.1em',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
        >
          Quiz 2 - Advanced Grammar
        </Link>
      </div>
    </div>
  );
}
