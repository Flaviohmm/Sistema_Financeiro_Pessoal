export const categoryMap: Record<string, string> = {
    SALARY: "Salário",
    FOOD: "Alimentação",
    RENT: "Aluguel",
    TRANSPORT: "Transporte",
    ENTERTAINMENT: "Lazer",
    OTHER: "Outros"
};

export function translateCategory(category: string) {
    return categoryMap[category] || category;
}