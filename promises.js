async function removeDatePicker() {
  const promise = new Promise((resolve, reject) => {
      resolve(timesheetDateValue.DatePickerX.remove());
      console.log("promise")
  });
  await promise;
}

