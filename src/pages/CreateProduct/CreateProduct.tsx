import { useForm } from 'react-hook-form';
import style from './CreateProduct.module.css';
import { useNavigate } from 'react-router';
import { jsonParseOrNull } from 'utils/json-try-parse';

export default function CreateProduct() {
  const navigate = useNavigate();

  interface FormData {
    id: number;
    title: string;
    thumbnail: string;
    developer: string;
    game_url: string;
    publisher: string;
    short_description: string;
    genre: string;
    platform: string;
    release_date: string;
  }


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'all',
  });

  const onSubmit = (data: { id: number; thumbnail: string; developer: string; game_url: string; publisher: string; }) => {
    console.log(data);
    data.id = Date.now();
    data.thumbnail = 'rpg_game_nb6ycbjref66.svg';
    data.developer ||= 'Неизвестен';
    data.game_url ||= 'Неизвестен';
    data.publisher ||= 'Неизвестен';

    const myProductsFromLocalStorage = jsonParseOrNull(localStorage.getItem('myProducts')) || [];
    localStorage.setItem('myProducts', JSON.stringify([...myProductsFromLocalStorage, data]));
    
    navigate('/products');
  };

  return (
    <div className={style.main_wrapper}>
      <h1>Создание</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Название:
          <input
            placeholder="Введите название"
            {...register('title', {
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
          />
        </label>
        <div className={style.errors_box}>
          {errors?.title?.type === 'required' && <span>Поле обязательно</span>}
          {errors?.title?.type === 'minLength' && (
            <span>Минимум 3 символа</span>
          )}
          {errors?.title?.type === 'maxLength' && (
            <span>Максимум 100 символов</span>
          )}
        </div>

        <label>
          Краткое описание:
          <input
            placeholder="Введите краткое описание"
            {...register('short_description', {
              required: true,
              minLength: 3,
              maxLength: 100000,
            })}
          />
        </label>
        <div className={style.errors_box}>
          {errors?.short_description?.type === 'required' && (
            <span>Поле обязательно</span>
          )}
          {errors?.short_description?.type === 'minLength' && (
            <span>Минимум 3 символа</span>
          )}
          {errors?.short_description?.type === 'maxLength' && (
            <span>Максимум 100000 символов</span>
          )}
        </div>

        <label>
          Адрес сайта:
          <input
            placeholder="Введите адрес сайта"
            {...register('game_url', {
              maxLength: 100,
              pattern: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\\/]))?/
            })}
          />
        </label>
        <div className={style.errors_box}>
          {errors?.game_url?.type === 'maxLength' && (
            <span>Максимум 100 символов</span>
          )}
          {errors?.game_url?.type === 'pattern' && (
            <span>Введите сайт виде https://www.example.com</span>
          )}
        </div>

        <label>
          Выберите жанр:
          <select
            {...register('genre', {
              required: true,
            })}
          >
            <option value="">...</option>
            <option value="MMORPG">MMORPG</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Shooter">Shooter</option>
            <option value="Race">Race</option>
            <option value="MOBA">MOBA</option>
          </select>
        </label>
        <div className={style.errors_box}>
          {errors?.genre?.type === 'required' && <span>Поле обязательно</span>}
        </div>

        <label>
          Выберите платформу:
          <select
            {...register('platform', {
              required: true,
            })}
          >
            <option value="">...</option>
            <option value="PC">PC</option>
            <option value="XBOX">XBOX</option>
            <option value="Playstation">Playstation</option>
          </select>
        </label>
        <div className={style.errors_box}>
          {errors?.platform?.type === 'required' && <span>Поле обязательно</span>}
        </div>

        <label>
          Издатель:
          <input
            placeholder="Введите название издателя"
            {...register('publisher', {
              maxLength: 100,
            })}
          />
        </label>
        <div className={style.errors_box}>

          {errors?.publisher?.type === 'maxLength' && (
            <span>Максимум 100 символов</span>
          )}
        </div>

        <label>
          Разработчик:
          <input
            placeholder="Введите название разработчика"
            {...register('developer', {
              maxLength: 100,
            })}
          />
        </label>
        <div className={style.errors_box}>

          {errors?.developer?.type === 'maxLength' && (
            <span>Максимум 100 символов</span>
          )}
        </div>

        <label>
          Дата выхода:
          <input type='date'
            placeholder="Введите дату выхода"
            {...register('release_date')}
          />
        </label>
        <div className={style.errors_box}/>

        <button type="submit" className={style.button}>
          Создать
        </button>
      </form>
    </div>
  );
}
