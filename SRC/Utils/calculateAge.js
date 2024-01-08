function calculateAge(dateOfBirth) {
        const currentDate = new Date();
        let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
        if (
            currentDate.getMonth() < dateOfBirth.getMonth() ||
            (currentDate.getMonth() === dateOfBirth.getMonth() &&
                currentDate.getDate() < dateOfBirth.getDate())
        ) {
            age--;
        }
        return age;
}
export default calculateAge;
