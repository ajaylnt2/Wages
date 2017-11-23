export default function myService() {
  'ngInject';

  this.name = '';
  this.annual = '';
  function setNavName(navName) {
    this.name = navName;
  }
  function getNavName() {
    return this.name;
  }
  function setAnnual(annualName) {
    this.annual = annualName;
  }
  function getAnnual() {
    return this.annual;
  }
  return {
    getNavName,
    setNavName,
    getAnnual,
    setAnnual,
  };
}
