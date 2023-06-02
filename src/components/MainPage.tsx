async function getCurrentUserProfile(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP status ${response.status}`);
  }

  const data = await response.json();

  console.log(data);
}

interface MainPageProps {
  token: string | null;
}

const MainPage: React.FC<MainPageProps> = ({ token }) => {
  const handleClick = () => {
    if (token) {
      getCurrentUserProfile(token);
    }
  }

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={handleClick}>
        Get Current User Profile
      </button>
    
    </div>
  );
}

export default MainPage;
