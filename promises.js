async function removeDatePicker() {
  const promise = new Promise((resolve, reject) => {
      resolve(timesheetDateValue.DatePickerX.remove());
      console.log("promise")
  });
  await promise;
}
//=====================================================
// Can be done with simple functions
async function f(){
  return something
}
// Can call funtion with:
f.then().catch();
//=====================================================
