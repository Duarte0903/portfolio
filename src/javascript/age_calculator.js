export function age_calculator() {
    const birthDate = new Date('2003-05-09');
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age.toString() + " ";
}