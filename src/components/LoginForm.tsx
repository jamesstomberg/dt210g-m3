export default function LoginForm() {
    return (
        <form>
            <div>
                <label htmlFor="username">Användarnamn eller E-post</label>
                <input type="text" name="username" id="username"/>
            </div>
            <div>
                <label htmlFor="password">Lösenord</label>
                <input type="password" name="password" id="password" />
            </div>

            <input type="submit" value="Logga in" />
        </form>
    );
}
