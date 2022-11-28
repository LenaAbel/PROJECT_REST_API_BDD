const getNumLaureatesPerYear = "SELECT annee, count(r.id_laureate) as nb_prix FROM PRIZES LEFT JOIN remporte r on PRIZES.id_prize = r.id_prize group by annee ORDER BY annee DESC;"
const getYearsWithoutPrizes = "SELECT annee, count(r.id_laureate) as nb_prix FROM PRIZES LEFT JOIN remporte r on PRIZES.id_prize = r.id_prize group by annee having count(r.id_laureate) = 0 ORDER BY annee DESC;"
const allYearsPrizesSortedASC = "SELECT annee, count(id_laureate) AS laureates FROM PRIZES INNER JOIN remporte r on PRIZES.id_prize = r.id_prize group by annee ORDER BY laureates ASC;"
const allYearsPrizesSortedDESC = "SELECT annee, count(id_laureate) AS laureates FROM PRIZES INNER JOIN remporte r on PRIZES.id_prize = r.id_prize group by annee ORDER BY laureates DESC;"

module.exports = {
    getNumLaureatesPerYear,
    getYearsWithoutPrizes,
    allYearsPrizesSortedASC,
    allYearsPrizesSortedDESC
}