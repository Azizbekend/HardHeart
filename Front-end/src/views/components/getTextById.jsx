import { nameTexts, smokingTexts, bodyTypeTexts, zodiacTexts, finansTexts } from '../Imports/data'


export default function getTextById(name, id) {
    if (name == "goal") {
        switch (id) {
            case "1":
                return "серьёзные отношения"
            case "2":
                return "свободные отношения"
            case "3":
                return "дружеское общение"
            case "4":
                return "новый опыт"
            default:
                return "думаю..."
        }
    }

    if (name == "alcohol") {
        return id != null ? nameTexts[id] : "думаю..."
    }
    if (name == "smoking") {
        return id != null ? smokingTexts[id] : "думаю..."
    }
    if (name == "bodyType") {
        return id != null ? bodyTypeTexts[id] : "думаю..."
    }
    if (name == "financialSituation") {
        return id != null ? finansTexts[id] : "думаю..."
    }
    if (name == "zadiak") {
        return id != null ? zodiacTexts[id] : "думаю..."
    }
}