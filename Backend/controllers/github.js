import { Octokit } from "@octokit/core";

// Tu token de acceso personal de GitHub
const token = "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";

// Crear una instancia de Octokit con el token de acceso personal
const octokit = new Octokit({ auth: token });

/**
 * Maneja la obtención de repositorios.
 * @async
 * @function adminLogin
 * @param {object} req - Objeto de solicitud (request) de Express.
 * @param {object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const getRepos = async (req, res) => {
    try {
        // Se obtienen los repositorios de un usuario
        const owner = "Dizkm8";
        const response = await octokit.request("GET /users/:owner/repos", {
            owner: owner,
        });
        // Por cada repositorio se obtiene el nombre, la fecha de creación y la cantidad de commits
        const reposWithInfo = await Promise.all(
            response.data.map(async (repo) => ({
                name: repo.name,
                created_at: repo.created_at,
                commits: await getCommitsCount(owner, repo.name),
            }))
        );
        // Ordena los repositorios por fecha
        const sortedRepos = reposWithInfo.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        // Envía una respuesta exitosa con los repositorios ordenados por fecha.
        res.status(200).json(sortedRepos);
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la obtención de repositorios.
        res.status(500).json({ message: "Error al obtener los repositorios", error: error.message });
    }
};

/**
 * Obtiene la cantidad de commits de un repositorio.
 * @async
 * @param {object} owner 
 * @param {object} repo 
 * @returns La cantidad de commits
 */
const getCommitsCount = async (owner, repo) => {
    try {
        // Se obtienen los commits del repositorio de un usuario
        const response = await octokit.request("GET /repos/:owner/:repo/commits", {
            owner: owner,
            repo: repo,
            per_page: 100,
        });
        // Retorna la cantidad de commits
        return response.data.length;
    } catch (error) {
        // Retorna como 0 la cantidad de commits si es que ocurre algún error
        return 0;
    }
};

/**
 * Obtiene información de los commits.
 * @async
 * @function getCommits
 * @param {object} req - Objeto de solicitud (request) de Express que contiene las credenciales del administrador (usuario y contraseña).
 * @param {object} res - Objeto de respuesta (response) de Express.
 * @returns {Promise<void>} - Promesa que representa la respuesta de la solicitud.
 */
export const getCommits = async (req, res) => {
    // Extrae las parametros del cuerpo de la solicitud.
    const repo = req.params.repo;

    try {
        // Se obtienen los commits del repositorio de un usuario
        const response = await octokit.request("GET /repos/:owner/:repo/commits", {
            owner: "Dizkm8",
            repo: repo,
            per_page: 100,
        });
        // Almacena la respuesta en una constante de commits
        const commits = response.data;
        // Envía una respuesta exitosa con los commits.
        res.status(200).json(commits);
    } catch (error) {
        // Envía una respuesta de error si ocurre algún problema durante la obtención de commits.
        res.status(500).json({ message: 'Error al obtener los commits', error: error.message });
    }
}