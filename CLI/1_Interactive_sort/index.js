function interactiveSort() {
  while (true) {
    const input = prompt(
      'Введіть 10 слів та чисел, розділених пробліами або exit для виходу із програми 🤗'
    );

    if (input.trim().toLowerCase() === 'exit') {
      console.log('Програма завершена 👐');
      break;
    }

    const items = input.trim().split(' ');

    const operation = prompt(`Виберіть операцію:
        1. Відсортувати слова за алфавітом.
        2. Показати числа за зростанням.
        3. Показати числа за спаданням.
        4. Показати слова в порядку зростання кількості букв.
        5. Показати тільки унікальні слова.
        6. Показати тільки унікальні елементи.
        Введіть номер операції 👇`);

    
    switch (operation){
        case "1":
            console.log(items.filter(item => isNaN(item)).sort());
            break;
        case "2":
            console.log(items.filter(item => !isNaN(item)).sort((a, b) => a - b));
            break;
        case "3":
            console.log(items.filter(item => !isNaN(item)).sort((a, b) => b - a));
            break;
        case "4":
            console.log(items.filter(item => isNaN(item)).sort((a, b) => a.length - b.length));
            break;
        case "5":
            console.log([...new Set(items.filter(item => isNaN(item)))]);
            break;
        case "6":
            console.log([...new Set(items)]);
            break;
        default:
            console.log("Неправильний вибір операції 🥶");
        
    }
  }
}

interactiveSort();

