
LATEX_FAILO_VARDAS = mainDocument

LATEX = pdflatex
LATEXFLAGS = -halt-on-error

# Commands start with TAB not spaces
info:
	@echo ${LATEX} ${LATEXFLAGS}

all: ${LATEX_FAILO_VARDAS}

${LATEX_FAILO_VARDAS}: ${LATEX_FAILO_VARDAS}.tex
#	@clear
	@max_print_line=176 ${LATEX} ${LATEXFLAGS} ${LATEX_FAILO_VARDAS}.tex > Output ; grep '!\|Warning\|Underfull\|Overfull\|undefined on' ${LATEX_FAILO_VARDAS}.log > Output_grep || echo "Klaidų ir įspėjimų neužregistruota!" > Output_grep
	@echo
	@cat Output_grep
	@echo

bib: literatureSources.bib
	bibtex ${LATEX_FAILO_VARDAS}.aux

clean:
	rm -rf *.aux *.log *.toc *.spl *.bbl *.blg *.out Output*

