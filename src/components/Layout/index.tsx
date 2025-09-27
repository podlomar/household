import './layout.css';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title = "Household Tracker" }: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Track household items and create shopping lists easily" />
        <title>{title}</title>
        <link rel="stylesheet" href="/server.css" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </head>

      <body>
        <div className="container" id="app">
          {children}
        </div>
      </body>
    </html>
  );
};
