export default function AgeCalculate(birthDate) {
    // Преобразуем строку в объект даты
    const birth = new Date(birthDate);
    const today = new Date();

    // Вычисляем возраст
    let age = today.getFullYear() - birth.getFullYear();

    // Проверяем, был ли день рождения уже в этом году
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}