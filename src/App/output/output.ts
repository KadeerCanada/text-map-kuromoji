// LICENSE : MIT
"use strict";
import { Token } from "../marker/Token";

const yo = require('yo-yo');
export default class Editor {
    private selector: string;
    private selectedMark: Token;
    private el: HTMLElement;
    private onClickNode: (token: Token) => void;

    constructor({ selector, onClickNode }: { selector: string, onClickNode: (token: Token) => void }) {
        this.selector = selector;
        this.el = this.render([]);
        this.onClickNode = onClickNode;
        let target = document.querySelector(selector);
        if (target) {
            target.appendChild(this.el)
        }
    }

    selectMark(token: Token) {
        if (!token) {
            return
        }
        this.selectedMark = token;
    }

    output(tokens: Token[]) {
        const newList = this.render(tokens);
        yo.update(this.el, newList);
        this.didUpdate()
    }

    render(tokens: Token[]) {
        const listItem = (token: Token) => {
            const onClick = () => {
                this.onClickNode(token);
            };
            const isSelected = this.selectedMark === token;
            const className = isSelected ? "node-link is-selected" : "node-link";
            const pos = token.pos; //[token.pos, token.pos_detail_1, token.pos_detail_2, token.pos_detail_3].filter(x => x.indexOf('*')==-1).join(' > ');
            const wtype = token.word_type == 'KNOWN' ? 'بار' : 'يوق';
            if(token.surface_form.trim().length == 0) {
                return '';
            }
//<th>${token.conjugated_type}</th>
//<th>${token.conjugated_form}</th>
// <th>${token.reading}</th>
// <th>${token.pronunciation}</th>
            return yo`<tr onclick=${onClick}>
<th><a role="button" onclick=${onClick} class=${className} title=${token.pos}>
    ${token.surface_form}
</a></th>
<th>${token.basic_form}</th>
<th>${wtype}</th>
<th>${token.word_position}</th>
<th> ${pos} </th>
<th>${token.conjugated_form}</th>
</tr>`
        };
        const list = tokens.map(listItem);
        return yo`<div class="table-wrapper">
    <table class="table">
    <thead class="table-head-sticky">
        <tr>
            <th>تېكىست شەكلى</th>
            <th>لۇغەت شەكلى</th>
            <!--<th>لۇغەتتىكى سۆز ID سى</th> -->
            <th>لۇغەتتە</th>
            <th>ئورنى</th>
            <th>سۆز تۈركۈمى</th>
            <th>ئۆزگىرىشى</th>
            <!--<th>ئوقۇلۇشى</th>
            <th>تەلەپپۇز</th>-->
        </tr>
    </thead>
    <tbody>
    ${list}
    </tbody>
    </table>
</div>`
    }

    didUpdate() {
        const selected = document.querySelector(".is-selected");
        if (!selected) {
            return;
        }
        selected.scrollIntoView();
    }
}
