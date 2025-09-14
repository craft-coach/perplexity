function getClasses() {
  return [
    "focus-visible:bg-offsetPlus",
    "hover:bg-offsetPlus",
    "text-quiet",
    "hover:text-foreground",
    "dark:hover:bg-offsetPlus",
    "font-sans",
    "focus:outline-none",
    "outline-none",
    "outline-transparent",
    "transition",
    "duration-300",
    "ease-out",
    "font-sans",
    "select-none",
    "items-center",
    "relative",
    "group/button",
    "justify-center",
    "text-center",
    "items-center",
    "rounded-full",
    "cursor-pointer",
    "active:scale-[0.97]",
    "active:duration-150",
    "active:ease-outExpo",
    "origin-center",
    "whitespace-nowrap",
    "inline-flex",
    "text-sm",
    "h-8",
    "aspect-square"
  ]
    ;
}

const DELETE_LABELS = ['delete', 'supprimer'];


function getAllAnswers() {
  const classes = getClasses();
  const elements = Array.from(document.querySelectorAll('[class]'));
  const matching = elements.filter(el =>
    classes.every(clss => el.classList.contains(clss))
  );
  return matching.reverse();
}

function openLastAnswerMenu() {
  const answers = getAllAnswers();
  answers[0].click();
}

function isDeleteButton(item) {
    let trimmedText = item.innerText.trim().toLowerCase();
    return DELETE_LABELS.includes(trimmedText);
}

function findMenuItems() {
  return Array.from(document.querySelectorAll('[role="menuitem"]'));
}

function clickDeleteButton() {
  const menuItems = findMenuItems();
  const deleteItem = menuItems.find(isDeleteButton);
  if (deleteItem != null) {
    deleteItem.click();
  } else {
    console.error('Could not find the delete button for this answer');
  }
}


function deleteLast() {
  openLastAnswerMenu()
  setTimeout(clickDeleteButton, 500);
}

function getAnswerCount() {
  const numberOfButtons = 5;
  const answers = getAllAnswers();
  return Math.round(answers.length / numberOfButtons);
}

function deleteRemainingIfAny() {
  if (getAnswerCount() > 1) {
    p.clear();
  }
}

p = {
  FREQUENCY_MS: 1000,

  deleteLast(count = 1, callback = () => {}) {
    console.log('Deleting', count, 'answers')
    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        console.log("Deleting latest answer:", i);
        deleteLast();
        if (i === count) {
          callback();
        }
      }, this.FREQUENCY_MS * i);
    }
  },

  deleteAll() {
    this.clear();
  },

  clear() {
    const count = getAnswerCount();
    this.deleteLast(count, deleteRemainingIfAny);
  }

};
