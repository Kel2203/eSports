import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Check } from "phosphor-react";
import { Input } from "../components/Form/Input";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if (!data.name){
        return;
    }
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaing: Number(data.yearsPlaing),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        useVoiceChannel: useVoiceChannel,
        hoursStart: data.hoursStart,
        hoursEnd: data.hoursEnd,
      });
      alert("Anúncio criado com sucesso!");
    } catch (err) {
        console.log(err);
      alert("Erro ao criar anúncio!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60 " />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publicar anúncio
        </Dialog.Title>

        
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Qual o game?
              </label>
              <select
                id="game"
                name="game"
                className="bg-zinc-900 font-sm placeholder:text-zinc-500 rounded px-4 py-3"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o game que deseja jogar
                </option>

                {games.map((game) => {
                  return (
                    <option 
                    key={game.id} 
                    value={game.id}>
                      {game.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input name="name" id="name" placeholder="Seu nome" />
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaing">Joga há quantos anos?</label>
                <Input
                  id="yearsPlaing"
                  name="yearsPlaing"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                  value={weekDays}
                >
                  <ToggleGroup.Item
                    value="0"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col  gap-2 flex-1">
                <label htmlFor="hoursStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    name="hoursStart"
                    id="hoursStart"
                    placeholder="De"
                  />
                  <Input
                    type="time"
                    name="hoursEnd"
                    id="hoursEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator className="w-4 h-4 rounded bg-zinc-900" />
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="flex justify-end mt-4 gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 hover:bg-zinc-600 font-semibold px-5 h-12 rounded-md"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-600 font-semibold px-5 h-12 rounded-md flex items-center gap-3"
              >
                <GameController className="w-6 h-6" />
                Encontrar duo
              </button>
            </footer>
          </form>
        
      </Dialog.Content>
    </Dialog.Portal>
  );
}
