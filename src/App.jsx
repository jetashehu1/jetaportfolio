import { InstagramProvider } from './lib/instagram.jsx';
import { matchRoute, RouterProvider, useRouter } from './lib/router.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Project from './pages/Project.jsx';

function Page() {
  const { path } = useRouter();
  const route = matchRoute(path);

  let content = <NotFound />;
  if (route.name === 'home') content = <Home />;
  if (route.name === 'project') content = <Project slug={route.slug} />;

  return (
    <div className="page" key={path}>
      <main id="main">{content}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <InstagramProvider>
        <a className="skip-link label" href="#main">
          Skip to content
        </a>
        <CustomCursor />
        <Header />
        <Page />
      </InstagramProvider>
    </RouterProvider>
  );
}
