const getAllLaureates = "SELECT * FROM LAUREATES ORDER BY id_laureate ASC"
const getLaureatesById = "SELECT firstname, surname, annee, nom_category, motivation FROM LAUREATES INNER JOIN remporte r on LAUREATES.id_laureate = r.id_laureate INNER JOIN PRIZES P on P.id_prize = r.id_prize INNER JOIN CATEGORY C on C.id_category = P.id_category WHERE r.id_laureate = $1;"
const deleteLaureate = "DELETE FROM LAUREATES WHERE id_laureate = $1"
const updateMotivation ="UPDATE remporte SET motivation = $4 WHERE id_prize = (SELECT PRIZES.id_prize FROM PRIZES INNER JOIN remporte r on PRIZES.id_prize = r.id_prize WHERE annee = $1 and id_category = (SELECT id_category from category WHERE nom_category = $2) AND r.id_laureate = $3);"

module.exports = {
    getAllLaureates,
    getLaureatesById,
    deleteLaureate,
    updateMotivation
}