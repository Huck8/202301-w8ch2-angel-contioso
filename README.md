Vamos a realizar el PUT de un usuario. Solo hay un punto de corte y debe quedar como la imagen.

Dia 1: Vamos a realizar el backend. Para ello tendremos 2 rutas:

- (GET) /user/:id
- (PUT) /user/:id

Nota: No hay que hacer el POST, se pueden dar de alta los usuarios en la colección usando Atlas. La información de la entidad user la podéis obtener del diseño.
Nota 2: NO hay que autenticar las rutas.
Nota 3: Para la imagen de perfil debemos utilizar Multer con supabase
Nota 4: Para las validaciones debemos usar express-validation
