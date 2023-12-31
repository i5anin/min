# Вычисление прогнозируемых данных:

1. Среднее изменение потребления электроэнергии рассчитывается путем суммирования разниц между последовательными точками данных и деления на количество точек данных минус один.

```js
// Расчет среднего изменения потребления электроэнергии
var totalChange = 0;
for (var i = 1; i < data.length; i++) {
  totalChange += data[i].y - data[i - 1].y;
}
var averageChange = totalChange / (data.length - 1);
```

2. Создается пустой массив `predictedData` для хранения прогнозируемых точек данных.

```js
// Генерация прогнозируемых данных
var predictedData = [];
```

3. Из фактических данных извлекается последняя точка данных, а ее значения даты и мощности сохраняются в переменных `lastDate` и `lastPower` соответственно.

```js
var lastDataPoint = data[data.length - 1];
var lastDate = luxon.DateTime.fromISO(lastDataPoint.x);
var lastPower = lastDataPoint.y;
```

4. Цикл используется для генерации 7 прогнозируемых точек данных, по одной на каждый день после последней фактической точки данных. Для каждой итерации цикла:

   a. Следующая дата рассчитывается путем добавления `i` дней к `lastDate`.

   ```js
   var nextDate = lastDate.plus({ days: i });
   ```

   b. Следующее значение мощности рассчитывается путем добавления `averageChange` к `lastPower`.

   ```js
   var nextPower = lastPower + averageChange;
   ```

   c. Новая точка данных с рассчитанными значениями даты и мощности добавляется в массив `predictedData`.

   ```js
   predictedData.push({ x: nextDate.toISO(), y: nextPower });
   ```

   d. Значение `lastPower` обновляется, чтобы быть равным `nextPower` для следующей итерации цикла.

   ```js
   lastPower = nextPower; // Обновление lastPower для следующей итерации
   ```

После этого процесса массив `predictedData` содержит 7 прогнозируемых точек данных, по одной на каждый день после последней фактической точки данных, со значениями мощности, рассчитанными на основе среднего изменения потребления электроэнергии.
