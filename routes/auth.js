const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), // el nombre tiene que ser obligatorio y que no este vacio es lo que hace este codigo
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/', 
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);

router.get('/renew', validarJWT, revalidarToken );




module.exports = router;