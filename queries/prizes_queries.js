const moreThanOnePrize = "SELECT firstname, surname, count(*) AS nbPrixGagnés FROM LAUREATES INNER JOIN remporte r on LAUREATES.id_laureate = r.id_laureate GROUP BY firstname, surname HAVING count(*) > 1;"

module.exports = {
    moreThanOnePrize
}