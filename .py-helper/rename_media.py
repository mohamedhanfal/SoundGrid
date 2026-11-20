import os
import shutil
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
AUDIO_DIR = BASE_DIR / "public" / "audio"
THUMB_DIR = AUDIO_DIR / "thumbnail"
FALLBACK_COVER = BASE_DIR / "public" / "images" / "covers" / "alan walker cover.jpg"

SONG_MAP = [
    ("faded", "alan_walker_faded"),
    ("alone", "alan_walker_alone"),
    ("on my way", "alan_walker_on_my_way"),
    ("the spectre", "alan_walker_the_spectre"),
    ("darkside", "alan_walker_darkside"),
    ("blinding lights", "the_weeknd_blinding_lights"),
    ("starboy", "the_weeknd_starboy"),
    ("save your tears", "the_weeknd_save_your_tears"),
    ("the hills", "the_weeknd_the_hills"),
    ("die for you", "the_weeknd_die_for_you"),
    ("billie jean", "michael_jackson_billie_jean"),
    ("beat it", "michael_jackson_beat_it"),
    ("smooth criminal", "michael_jackson_smooth_criminal"),
    ("thriller", "michael_jackson_thriller"),
    ("man in the mirror", "michael_jackson_man_in_the_mirror"),
    ("unity", "thefatrat_unity"),
    ("monody", "thefatrat_monody"),
    ("fly away", "thefatrat_fly_away"),
    ("the calling", "thefatrat_the_calling"),
    ("xenogenesis", "thefatrat_xenogenesis"),
    ("srivalli", "sid_sriram_srivalli"),
    ("kadhaippoma", "sid_sriram_kadhaippoma"),
    ("samajavaragamana", "sid_sriram_samajavaragamana"),
    ("inkem inkem", "sid_sriram_inkem_inkem"),
    ("ennodu nee irundhaal", "sid_sriram_ennodu_nee_irundhaal"),
]


def match_target(filename: str):
    lower_name = filename.lower()
    for keyword, target in SONG_MAP:
        if keyword in lower_name or target in lower_name:
            return target
    return None


def rename_audio_files():
    if not AUDIO_DIR.exists():
        print(f"Audio folder not found: {AUDIO_DIR}")
        return

    for item in sorted(AUDIO_DIR.iterdir()):
        if not item.is_file() or item.suffix.lower() != ".mp3":
            continue
        target = match_target(item.stem)
        if not target:
            print(f"Skipped unmatched audio: {item.name}")
            continue
        new_path = AUDIO_DIR / f"{target}.mp3"
        if item.resolve() == new_path.resolve():
            print(f"OK audio: {new_path.name}")
            continue
        os.replace(item, new_path)
        print(f"Renamed audio: {item.name} -> {new_path.name}")


def rename_thumbnails():
    if not THUMB_DIR.exists():
        print(f"Thumbnail folder not found: {THUMB_DIR}")
        return

    for item in sorted(THUMB_DIR.iterdir()):
        if not item.is_file() or item.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        target = match_target(item.stem)
        if not target:
            print(f"Skipped unmatched thumbnail: {item.name}")
            continue
        new_path = THUMB_DIR / f"{target}_thumbnail.jpg"
        if item.resolve() == new_path.resolve():
            print(f"OK thumbnail: {new_path.name}")
            continue
        os.replace(item, new_path)
        print(f"Renamed thumbnail: {item.name} -> {new_path.name}")


def ensure_faded_fallback():
    faded_audio = AUDIO_DIR / "alan_walker_faded.mp3"
    alone_audio = AUDIO_DIR / "alan_walker_alone.mp3"
    if not faded_audio.exists() and alone_audio.exists():
        shutil.copy2(alone_audio, faded_audio)
        print("Created placeholder alan_walker_faded.mp3 from alan_walker_alone.mp3")

    faded_thumb = THUMB_DIR / "alan_walker_faded_thumbnail.jpg"
    if not faded_thumb.exists() and FALLBACK_COVER.exists():
        shutil.copy2(FALLBACK_COVER, faded_thumb)
        print("Created placeholder alan_walker_faded_thumbnail.jpg from alan walker cover.jpg")


if __name__ == "__main__":
    rename_audio_files()
    rename_thumbnails()
    ensure_faded_fallback()
    print("Done.")
