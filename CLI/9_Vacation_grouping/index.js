import fs from 'fs/promises';

async function transformVacations() {
  try {
    const data = await fs.readFile('vacations.json', 'utf8');
    const vacations = JSON.parse(data);
    console.log(vacations.length);

    const transformedData = {};

    vacations.forEach(vacation => {
      const { user, startDate, endDate } = vacation;
      const userId = user._id;

      if (!transformedData[userId]) {
        transformedData[userId] = {
          userId: userId,
          name: user.name,
          weekendDates: []
        };
      }

      transformedData[userId].weekendDates.push({ startDate, endDate });
      console.log(transformedData)
    });

    const result = Object.values(transformedData);
    console.log(result.length)

    await fs.writeFile('transformed_vacations.json', JSON.stringify(result, null, 2));

    console.log('Трансформація завершена. Результат збережено у transformed_vacations.json');
  } catch (error) {
    console.error('Помилка при обробці файлу:', error);
  }
}

transformVacations();