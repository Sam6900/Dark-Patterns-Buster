import pandas as pd
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline, logging
logging.set_verbosity_error()


def create_pipeline(
    pretrained: str,
    path_to_trained_model: str,
    device: torch.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
) -> pipeline:
    # Load model and tokenizer
    model = AutoModelForSequenceClassification.from_pretrained(
        pretrained,
        num_labels=2,
        label2id={"non-darkpattern": 0, "darkpattern": 1},
        id2label={0: "non-darkpattern", 1: "darkpattern"},
    ).to(device)
    model.load_state_dict(torch.load(path_to_trained_model, map_location=device))
    model.eval()

    tokenizer = AutoTokenizer.from_pretrained(pretrained)
    return pipeline(
        "text-classification", model=model, tokenizer=tokenizer, device=0
    )

   