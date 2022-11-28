const getCategories = "SELECT * FROM CATEGORY"
const mostPrizePerCategory = "SELECT nom_category, count(*) as nb_prize FROM PRIZES INNER JOIN remporte r on PRIZES.id_prize = r.id_prize INNER JOIN CATEGORY C on C.id_category = PRIZES.id_category INNER JOIN LAUREATES L on L.id_laureate = r.id_laureate GROUP BY nom_category ORDER BY nb_prize desc LIMIT 1;"

module.exports = {
    getCategories,
    mostPrizePerCategory
}