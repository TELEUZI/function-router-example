interface ResultPageProps {
  name: string;
  score: number;
}

export default function createResultPage(props: ResultPageProps[]): HTMLElement {
  const el = document.createElement('div');
  el.classList.add('result-page');
  el.innerHTML = `<h1>Result</h1>`;
  props.forEach((item) => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} - ${item.score}</p>`;
    el.appendChild(div);
  });
  return el;
}
