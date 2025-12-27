function main() {
    const input = document.getElementById("input");
    const output = document.getElementById("output")

    const commands = {
        help() {
            return `
            - help 
            - about 
            - theme[red, blue, green]
            `;
        },

        about() {
            return `Hi, I am Ecnir. thanks for looking around.`
        },

        theme(args) {
            const themes = {
                green : {fg: "#33ff33", bg: "#000;", glow: "#33ff33b0"},
                red : {fg: "#ff0008", bg: "#000;", glow: "#ff0008b0"},
                blue : {fg: "#33ccff", bg: "#000;", glow: "#33ccffb0"},
            }
            if (!args[0]) {
                return `usage specify a color red, blue, green`
            }
            const selected = themes[args[0]];
            if (!selected) return `unknown theme : ${args[0]}`
            document.documentElement.style.setProperty("--fg", selected.fg);
            document.documentElement.style.setProperty("--bg", selected.bg);
            document.documentElement.style.setProperty("--glow", selected.glow);
            return `theme set to ${args[0]}`
        }
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const text = input.value.trim()
            const parts = text.split(" ")
            const cmd = parts[0];
            const args = parts.slice(1);
            const p = document.createElement("p");
            p.textContent = `user@web:-> ${text}`
            output.appendChild(p);
            

            if (commands[cmd]) {
                const result = commands[cmd](args);
                if (result) {
                    const r = document.createElement("p");
                    r.textContent = result;
                    output.appendChild(r);
                }
            } else if (text) {
                const err = document.createElement("p");
                err.textContent = `command not found: ${cmd}`;
                output.appendChild(err);
            }

            input.value = "";
            input.scrollIntoView({behavior: "smooth"});
        }
    })


}

document.addEventListener("load", main());