import { Code2 } from "lucide-react";

export default function OpenSourceCard() {
  return (
    <section className="opensource-card">
      <Code2 size={30} />
      <div>
        <h2>Ouvert par principe</h2>
        <p>Le code a vocation à être publié sous licence MIT. Une équipe de 4 contribue à cette démo avec le soutien de Galsen DEV et MLH.</p>
      </div>
      <a href="https://github.com"><Code2 size={17} /> Explorer le projet</a>
    </section>
  );
}
