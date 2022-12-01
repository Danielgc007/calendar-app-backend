/*

    /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos'); 
const router = Router();

const { getEventos, actualizarEvento, eliminarEvento, crearEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

// todas tienen que pasar por la validacion del JWT
router.use( validarJWT );

// obtener eventos
router.get('/', getEventos )

// crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

// actualizar un evento
router.put('/:id', actualizarEvento )

// eliminar un evento
router.delete('/:id', eliminarEvento )

module.exports = router;