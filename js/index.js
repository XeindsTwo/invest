document.addEventListener('DOMContentLoaded', function () {
  const sumInvestSlider = document.getElementById('sumInvestSlider');
  const timeInvestSlider = document.getElementById('timeInvestSlider');
  const sumInvest = document.getElementById('sumInvest');
  const timeInvest = document.getElementById('timeInvest');
  const forecastPercent = document.getElementById('forecastPercent');
  const endOfPeriod = document.getElementById('endOfPeriod');
  const incomeInvest = document.getElementById('incomeInvest');

  const forecastRates = {
    12: 27.3,
    18: 48.5,
    30: 69.5
  };

  noUiSlider.create(sumInvestSlider, {
    start: 5000,
    connect: [true, false],
    range: {
      'min': 5000,
      'max': 300000
    },
    step: 5000,
    format: {
      to: value => parseInt(value),
      from: value => parseInt(value)
    }
  });

  noUiSlider.create(timeInvestSlider, {
    start: 12,
    connect: [true, false],
    range: {
      'min': 12,
      'max': 30
    },
    step: 6,
    format: {
      to: value => parseInt(value),
      from: value => parseInt(value)
    },
    pips: {
      mode: 'values',
      values: [12, 18, 30],
      density: 10
    }
  });

  function calculateIncome(sum, time) {
    const rate = forecastRates[time] || 0;
    return sum * (rate / 100);
  }

  function updateValues() {
    const sumValue = parseInt(sumInvestSlider.noUiSlider.get());
    const timeValue = parseInt(timeInvestSlider.noUiSlider.get());
    const income = calculateIncome(sumValue, timeValue);
    const total = sumValue + income;

    sumInvest.textContent = `${Math.round(sumValue).toLocaleString('ru-RU')} евро`;
    timeInvest.textContent = `${timeValue} месяцев`;
    forecastPercent.textContent = `${forecastRates[timeValue]}%`;
    incomeInvest.textContent = `${Math.round(income).toLocaleString('ru-RU')} евро`;
    endOfPeriod.textContent = `${Math.round(total).toLocaleString('ru-RU')} евро`;
  }

  function correctTimeValue(values, handle) {
    let value = parseInt(values[handle]);
    let newValue = value <= 15 ? 12 : value <= 24 ? 18 : 30;

    if (newValue !== value) {
      timeInvestSlider.noUiSlider.set(newValue);
    } else {
      updateValues();
    }
  }

  sumInvestSlider.noUiSlider.on('update', updateValues);
  timeInvestSlider.noUiSlider.on('update', correctTimeValue);

  updateValues();
});