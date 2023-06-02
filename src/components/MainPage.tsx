import Search from './Search'

interface MainPageProps {
  token: string | null;
}

const MainPage: React.FC<MainPageProps> = ({ token }) => {
  return (
    <div>
      <h2>Search your saved albums, episodes and tracks</h2>
      {token && <Search token={token}/>}
    </div>
  );
}

export default MainPage;
