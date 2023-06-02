import Search from './Search'

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
      <h3>Search your saved albums, episodes and tracks</h3>
      {token && <Search token={token}/>}
    </div>
  );
}

export default MainPage;
