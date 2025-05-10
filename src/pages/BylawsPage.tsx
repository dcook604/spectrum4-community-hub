
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollToSection } from "@/components/ScrollToSection";

export default function BylawsPage() {
  const location = useLocation();
  const [openSection, setOpenSection] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (location.hash) {
      // Extract the part number from the hash
      const part = location.hash.match(/part(\d+)/);
      if (part) {
        setOpenSection(`part${part[1]}`);
      }
    }
  }, [location.hash]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <ScrollToSection hash={location.hash} />
      <Card>
        <CardContent className="p-6 md:p-8">
          <h1 className="text-3xl font-bold border-b-2 border-spectrum-blue pb-4 mb-6">
            BYLAWS<br />STRATA PLAN BCS2611<br />"Spectrum IV"<br />602 CITADEL PARADE<br />VANCOUVER, BC
          </h1>

          <div className="bg-slate-50 p-4 rounded-md mb-8">
            <h2 className="text-xl font-semibold mb-3">TABLE OF CONTENTS</h2>
            <ul className="space-y-2">
              <li><a href="#notice" className="text-spectrum-blue hover:underline">NOTICE</a></li>
              <li><a href="#part1" className="text-spectrum-blue hover:underline">PART 1 - INTERPRETATION AND EFFECT</a></li>
              <li><a href="#part2" className="text-spectrum-blue hover:underline">PART 2 - DUTIES OF OWNERS, TENANTS, OCCUPANTS AND VISITORS</a></li>
              <li><a href="#part3" className="text-spectrum-blue hover:underline">PART 3 - POWERS AND DUTIES OF STRATA CORPORATION</a></li>
              <li><a href="#part4" className="text-spectrum-blue hover:underline">PART 4 - COUNCIL</a></li>
              <li><a href="#part5" className="text-spectrum-blue hover:underline">PART 5 - ENFORCEMENT OF BYLAWS AND RULES</a></li>
              <li><a href="#part6" className="text-spectrum-blue hover:underline">PART 6 - ANNUAL OR SPECIAL GENERAL MEETINGS</a></li>
              <li><a href="#part7" className="text-spectrum-blue hover:underline">PART 7 - VOLUNTARY DISPUTE RESOLUTION</a></li>
              <li><a href="#part8" className="text-spectrum-blue hover:underline">PART 8 - SIGNAGE AND POSTINGS</a></li>
              <li><a href="#part9" className="text-spectrum-blue hover:underline">PART 9 - PARKING</a></li>
              <li><a href="#part10" className="text-spectrum-blue hover:underline">PART 10 - STORAGE</a></li>
              <li><a href="#part11" className="text-spectrum-blue hover:underline">PART 11 - RENTALS AND MOVING</a></li>
              <li><a href="#part12" className="text-spectrum-blue hover:underline">PART 12 - APPEARANCE OF STRATA LOTS</a></li>
              <li><a href="#part13" className="text-spectrum-blue hover:underline">PART 13 - SECURITY</a></li>
              <li><a href="#part14" className="text-spectrum-blue hover:underline">PART 14 - GARBAGE / RECYCLING</a></li>
              <li><a href="#part15" className="text-spectrum-blue hover:underline">PART 15 - INSURANCE</a></li>
              <li><a href="#part16" className="text-spectrum-blue hover:underline">PART 16 - MISCELLANEOUS</a></li>
            </ul>
          </div>

          <div id="notice" className="mb-8 bg-yellow-50 p-4 border-l-4 border-yellow-400">
            <h2 className="text-2xl font-bold mb-3">NOTICE</h2>
            <p className="font-semibold mb-2">The attached bylaws for Strata Plan BCS2611 are in addition to those bylaws contained in the Strata Property Act of B.C. In addition to bylaws, there could also be "Rules and Regulations" which are not registered at the Land Title Office but are attached herein. For legal purposes, you should obtain a true copy of the bylaws from the Land Title Office.</p>
            <p className="font-semibold">(Updated March 26, 2025)</p>
          </div>

          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            value={openSection}
            onValueChange={setOpenSection}
          >
            <AccordionItem value="part1" id="part1">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                PART 1 - INTERPRETATION AND EFFECT
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <h3 className="text-lg font-medium mt-2 mb-3">Section 1 - Force and Effect</h3>
                <div className="ml-4 mb-4">
                  <p className="mb-2"><strong>1.1</strong> These Bylaws bind the Strata Corporation and all owners/residents to the same extent, as if the Bylaws had been signed by the Strata Corporation, and each owner/resident and contained covenants on the part of the Strata Corporation with each owner/resident, and of each owner/resident with every other owner/resident to observe and perform every provision of these Bylaws.</p>
                  <p><strong>1.2</strong> All owners, residents and visitors must comply strictly with these Bylaws and the Rules of the Strata Corporation, as adopted and amended from time to time.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="part2" id="part2">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                PART 2 - DUTIES OF OWNERS, TENANTS, OCCUPANTS AND VISITORS
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <h3 className="text-lg font-medium mt-2 mb-3">Section 2 - Payment of Strata Fees and Special Levies</h3>
                <div className="ml-4 mb-4">
                  <p className="mb-2"><strong>2.1</strong> An owner must pay strata fees on or before the first (1st) day of the month to which the strata fees relate.</p>
                  <p className="mb-2"><strong>2.2</strong> If an owner fails to pay the strata fees on time, the owner must pay interest on the arrears at the rate of 10% per annum, compounded annually, and calculated on a monthly basis from the date the payment was due until the date of payment.</p>
                  <p className="mb-2"><strong>2.3</strong> A special levy is due and payable on the date or dates noted in the resolution authorizing the special levy.</p>
                  <p className="mb-2"><strong>2.4</strong> Any owner owing money for strata fees not received by the first (1st) of the month in question will be deemed to be in arrears: penalties, subsection 2.5 (a),(b),(c) will be imposed for each month that an owner strata fees are in arrears.</p>
                  <p className="mb-2"><strong>2.5</strong> If an owner fails to pay outstanding strata fees or special levies on the due date, the strata corporation will levy fines communicatively as follows:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) $50 if arrears are paid in the period up to 15 days after the due date;</p>
                    <p>(b) $100 if arrears are paid after more than 15 days, but before 30 days after the due date; and</p>
                    <p>(c) $100 per month payable after the first full month of default.</p>
                  </div>
                  <p className="mb-2"><strong>2.6</strong> To ensure proper collections of arrears, the strata corporation will apply one or more of the following measures against the units that owe sums in excess of $500 to the strata corporation for either lienable or non-lienable charges:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) denial of access to Recreational facilities;</p>
                    <p>(b) deactivation of all but one FOB; and</p>
                    <p>(c) initiation of legal action.</p>
                  </div>
                  <p className="mb-2">These actions will be applied to the Strata Lot Owner after 2 written warnings or demand notices for collections of arrears owed. The application of this rule is authorized for arrears that pertain to, but are not limited to unpaid strata fees, special levies, interest on arrears, NSF charges, security deposit, moving fees, purchases of fobs, legal expenses, unpaid insurance deductibles, the cost for remediation of damage and repairs charge back to a unit, and fines for violations of the rental bylaws or any other Bylaw that infringe upon common safety, security or well-being of the community of the residence at Spectrum 4 (BCS2611).</p>
                  <p className="mb-2"><strong>2.7</strong> An owner must provide the strata corporation or its agent with twelve (12) consecutive, monthly post-dated cheques for strata fees for the fiscal year of the strata corporation, dated as of the first day of each month, or if applicable, written authorization for monthly automatic debit from the owner's bank account. Strata lots managed by professional rental companies do not have to provide 12 post-dated cheques.</p>
                  <p className="mb-2"><strong>2.8</strong> Failure by an owner to submit twelve (12) monthly, post-dated strata fee cheques or written authorization for automatic debit in accordance with subsection (2.7) is in contravention of bylaw (2.1) and the strata corporation will levy a fine according to Section 2.5, subsections (a), (b), (c), for each contravention. Each dishonored cheque or dishonored automatic debit will be subject to a fine of $50.00 and an administration charge of $25.00. Strata lots managed by professional rental companies do not have to provide 12 post-dated cheques.</p>
                  <p className="mb-2"><strong>2.9</strong> Any fines assessed pursuant to these bylaws will be added to the strata fees of the owner following the date of the notice of infraction.</p>
                  <p className="mb-2"><strong>2.10</strong> Interest, penalties and fines referred to in Sections (2.2), (2.4), (2.5) (a),(b),(c) and (2.7) above will apply to outstanding and overdue special levies and assessments.</p>
                  <p className="mb-2"><strong>2.11</strong> When arrears exceed 90 days, a lien may be registered in accordance with Section 116 of the Act on the Strata Lot involved at the Owner's sole expense, for the total monies due including all strata fees outstanding, penalties assessed, all legal and other expenses.</p>
                  <p className="mb-2"><strong>2.12</strong> The strata corporation may proceed under the Small Claims Act, without further authorization by the owners, to recover from an owner, by an action in debt in Small Claims Court, money owing to the strata corporation, including money owing as administration fees, bank charges, fines, penalties, interest or the costs, including legal costs, of remedying a contravention of the bylaws or rules and to recover money which the strata corporation is required to expend as a result of the owner's act, omission, negligence or carelessness or by that of an owner's visitors, occupants, guests, employees, agents, tenants or a member of the owner's family.</p>
                  <p className="mb-2"><strong>2.13</strong> Owners who are in arrears or have a lien are not eligible to vote at the Annual General Meeting/Special General Meeting, unless approved by a unanimous resolution.</p>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-3">Section 3 - Repair and Maintenance of Property by Owner</h3>
                <div className="ml-4 mb-4">
                  <p className="mb-2"><strong>3.1</strong> An owner must repair and maintain the owner's strata lot, except for repair and maintenance that is the responsibility of the strata corporation under these bylaws.</p>
                  <p className="mb-2"><strong>3.2</strong> An owner who has the use of limited common property must repair and maintain it, except for repair and maintenance that is the responsibility of the strata corporation under these bylaws.</p>
                  <p><strong>3.3</strong> Owners, residents and visitors must use all reasonable efforts to conserve the plumbing and electrical systems of the building. Any damage to any of these systems caused by the wrongful act or neglect of a resident or visitor of the strata lot shall be repaired at the expense of the owner of the strata lot.</p>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-3">Section 4 - Use of Property</h3>
                <div className="ml-4 mb-4">
                  <p className="mb-2"><strong>4.1</strong> An owner, owner's visitor, occupant, guest, employee, agent, tenant or a member of the owner's family, must not use a strata lot, the common property or common assets in a way that:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) causes a nuisance or hazard to another person;</p>
                    <p>(b) causes unreasonable noise (compliant with Section 10 (Noise), as outlined in the BCS2611 Bylaws);</p>
                    <p>(c) unreasonably interferes with the rights of other persons to use and enjoy the common property, common assets or another strata lot;</p>
                    <p>(d) is illegal, or otherwise injurious to the reputation of the strata plan development; or</p>
                    <p>(e) is contrary to a purpose for which the strata lot or common property is intended as shown expressly or by necessary implication on or by the strata plan.</p>
                  </div>
                  
                  <p className="mb-2"><strong>4.2</strong> An owner, owner's visitor, occupant, guest, employee, agent, tenant or a member of the owner's family, shall not:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) do anything that will increase the risk of fire, or the rate of insurance on the building, or any part thereof;</p>
                    <p>(b) permit a condition to exist within a strata lot, which will result in the waste of excessive consumption of the buildings, gas supply, domestic water, supply, or heated water;</p>
                    <p>(c) leave or store any items on common property (including but not limited to hallways and parking lots);</p>
                    <p>(d) obstruct or restrict sidewalks, entrances, exits, halls, passageways, stairways, and other parts of the common property, nor use any passageways or driveways for any purpose other than ingress or egress from the strata lots and parking areas within the common property;</p>
                    <p>(e) shake rugs, carpets, mops, dusters of any kind from any balcony, window, stairway or other part of a strata lot or common property;</p>
                    <p>(f) throw refuse or other objects out of any windows or from any balcony or patio of a strata lot;</p>
                    <p>(g) use his strata lot for any purpose which may be injurious to the reputation of the building</p>
                    <p>(h) make undue noise in or about any strata lot or common property;</p>
                    <p>(i) keep any animals on his strata lot or the common property after notice not to do so from the strata council;</p>
                    <p>(j) make or cause to be made any structural alteration to his strata lot, or paint, decorate, or add to or remove any structure from the exterior of the building or the strata lot or add to or alter the wiring, plumbing, piping, or other services on his strata lot, or within any bearing or party wall or the common property without first obtaining the written consent of the strata council;</p>
                    <p>(k) throw refuse or any objects, cigarette, cigar, marijuana butts, fluids, or projectiles of any kind, from anywhere on the property (i.e. to any strata lot, common area ground or street below).</p>
                  </div>
                  
                  <p className="mb-2"><strong>4.3</strong> An owner, tenant, occupant or visitor must not cause damage, other than reasonable wear and tear, to the common property, common assets or those parts of a strata lot which the strata corporation must repair and maintain under these bylaws or insure under section 149 of the Act.</p>
                  <p className="mb-2"><strong>4.4</strong> An owner shall indemnify and save harmless the strata corporation from the expense of any maintenance, repair, or replacement, rendered necessary to the common property, limited common property, common assets, or to any strata lot by the owners act, omission, negligence, or carelessness or by that of an owners, visitors, occupants, guests, employees, agents, tenants or member of the owner's family, but only to the extent that such expense is not reimbursed from the proceeds received by operation of any insurance policy.</p>
                  <div className="ml-6 mb-2">
                    <p>(a) In such circumstances, any insurance deductible paid or payable by the strata corporation shall be considered an expense not covered by the proceeds received by the strata corporation as an insurance coverage will be charged to the strata lot owner.</p>
                  </div>
                  <p className="mb-2"><strong>4.5</strong> Unit doors are common property and therefore subject to this section 4. If an owner or resident chooses to change the locking mechanism and/or the door in any way, including new hardware, the strata lot owner is therefore responsible for the hardware and locking mechanism. Should any damage be caused to the door or door frame through the installation and/or maintenance of the new locking system, the strata lot owner will be responsible for the repair or replacement of that door, so that this is restored to its original appearance. This may include instances where the new hardware is poorly installed, and therefore detracts from the general appearance of the door.</p>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-3">Section 5 - No Smoking</h3>
                <div className="ml-4 mb-4">
                  <p className="mb-2"><strong>5.1</strong> "Spectrum 4" is a designated "non-smoking" strata corporation. Smoking is prohibited everywhere, including inside the individual suites. For the purposes of this bylaw the term "smoke" or "smoking" includes but is not limited to:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) inhaling, exhaling, burning or carrying of a lighted cigarette, cigar, pipe, hookah pipe or other lighted smoking equipment that burns tobacco or other substances, including but not limited to marijuana;</p>
                    <p>(b) the burning, combusting and/or vaporizing of:</p>
                    <div className="ml-6 mb-2">
                      <p>(i) tobacco of any type;</p>
                      <p>(ii) any plant, plant product or by-product;</p>
                      <p>(iii) any drugs or pharmaceuticals including but not limited to marijuana, crack cocaine, hashish, methamphetamines or heroin;</p>
                      <p>(iv) e-liquids or other substances used in vaporizers, electronic cigarettes or similar appliances which allow for the inhalation of vapour of atomized liquids or substances.</p>
                    </div>
                  </div>
                  <p className="mb-2">For the purposes of this bylaw "vape" or "vaping" includes inhaling, exhaling, vapourizing or carrying or using an activated e-cigarette.<br />
                  For the purposes of this bylaw "marijuana" includes any plant grown or cultivated and harvested from the cannabis plant.</p>
                  <p className="mb-2"><strong>5.2</strong> A resident or visitor must not smoke or vape in or on the following areas that comprise and are part of the buildings and lands that comprise the Strata Corporation which include but are not limited to:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) a strata lot;</p>
                    <p>(b) any common property that is located within a building (including but not limited to stairways, hallways, parking garages and walkways);</p>
                    <p>(c) any limited common property;</p>
                    <p>(d) a balcony, patio or deck;</p>
                    <p>(e) within six metres of a door, window or air intake; or</p>
                    <p>(f) as set out in the Tobacco and Vapour Products Control Act and the Tobacco and Vapour Products Control Regulation.</p>
                  </div>
                  <p className="mb-2"><strong>5.3</strong> A resident is prohibited from growing, harvesting, selling, distributing or cultivating marijuana in or on the following areas:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) a strata lot;</p>
                    <p>(b) any common property that is located within a building (including but not limited to stairways hallways, parking garages and walkways);</p>
                    <p>(c) any limited common property;</p>
                    <p>(d) a balcony, patio or deck; and</p>
                    <p>(e) any exterior common property.</p>
                  </div>
                  <p className="mb-2"><strong>5.4</strong> A resident is prohibited from consuming alcohol on Common Property, including elevators, lobbies, hallways, common facilities or any other common areas within the building.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="part3" id="part3">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                PART 3 - POWERS AND DUTIES OF STRATA CORPORATION
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <h3 className="text-lg font-medium mt-2 mb-3">Section 14 - Repair and Maintenance of Property by Strata Corporation</h3>
                <div className="ml-4 mb-4">
                  <p className="mb-2"><strong>14.1</strong> The strata corporation must repair and maintain all of the following:</p>
                  <div className="ml-6 mb-2">
                    <p>(a) common assets of the strata corporation;</p>
                    <p>(b) common property that has not been designated as limited common property;</p>
                    <p>(c) limited common property, but the duty to repair and maintain it is restricted to</p>
                    <p>(d) repair and maintenance that in the ordinary course of events occurs less often than once a year, and</p>
                    <p>(e) the following, no matter how often the repair or maintenance ordinarily occurs:</p>
                    <div className="ml-6 mb-2">
                      <p>(i) the structure of a building;</p>
                      <p>(ii) the exterior of a building;</p>
                      <p>(iii) chimneys, stairs, balconies and other things attached to the exterior of a building;</p>
                      <p>(iv) doors, windows or skylights, on the exterior of a building or that front on the common property;</p>
                      <p>(v) fences, railings and similar structures that enclose patios, balconies and yards;</p>
                    </div>
                    <p>(f) a strata lot in a strata plan that is not a bare land strata plan, but the duty to repair and maintain it is restricted to:</p>
                    <div className="ml-6 mb-2">
                      <p>(i) the structure of a building;</p>
                      <p>(ii) the exterior of a building;</p>
                      <p>(iii) chimneys, stairs, balconies and other things attached to the exterior of a building;</p>
                      <p>(iv) doors and windows on the exterior of a building or that front on the common property; and</p>
                      <p>(v) fences, railings and similar structures that enclose patios, balconies and yards.</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Additional AccordionItems for parts 4-16 would follow the same pattern */}
            <AccordionItem value="part4" id="part4">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                PART 4 - COUNCIL
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="ml-4 mb-4">
                  <p className="italic">Content for Part 4 would go here.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Parts 5-16 would follow the same pattern */}
            <AccordionItem value="part5" id="part5">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                PART 5 - ENFORCEMENT OF BYLAWS AND RULES
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="ml-4 mb-4">
                  <p className="italic">Content for Part 5 would go here.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="part16" id="part16">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                PART 16 - MISCELLANEOUS
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="ml-4 mb-4">
                  <p className="italic">Content for Part 16 would go here.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>For a complete copy of the bylaws, please contact the strata management company.</p>
            <p>Last updated: March 26, 2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
