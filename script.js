const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    //Cria uma className com o nome dragging
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    console.log(afterElement);
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const dragabbleElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];
  //Vamos retornar um array de dragabbles com spread, porque o querySelector não retorna um array;
  //Todo objeto que não está sendo arrastado.
  //O dragabble são todos os <p/> dentro do container, e o dragging é o que está sendo selecionado

  //O método reduce executa uma função de callback para cada elemento do array;
  //O valor inicial é especificado no segundo argumento, nesse caso foi como objeto offset. Caso não seja especificado, o valor inicial do acumulador será o primeiro elemento do array
  //closest é o acumulador e o child o valor atual;
  return dragabbleElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
}

//O .element é para quando o reduce retorna um objeto da função de callback;
